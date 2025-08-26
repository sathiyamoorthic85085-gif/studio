import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, PlusCircle, Upload } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

const assignments = [
  { id: 'AS001', title: 'Calculus Worksheet', course: 'MATH-101', dueDate: '2023-11-05', status: 'Pending' },
  { id: 'AS002', title: 'Physics Lab Report', course: 'PHY-101', dueDate: '2023-11-02', status: 'Submitted' },
  { id: 'AS003', title: 'History Essay', course: 'HIST-101', dueDate: '2023-10-28', status: 'Late' },
];

const submissions = [
    { id: 'SUB01', student: 'John Doe', assignment: 'Calculus Worksheet', date: '2023-11-04' },
    { id: 'SUB02', student: 'Jane Smith', assignment: 'Calculus Worksheet', date: '2023-11-05' },
]

export default async function AssignmentsPage() {
    const user = await getCurrentUser();
    const isAdmin = user?.role === 'hod' || user?.role === 'advisor';

  return (
    <Card className="bg-card/50 backdrop-blur-lg border-border/30 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="font-headline text-2xl">Assignments</CardTitle>
            <CardDescription>
            {isAdmin ? 'View submissions and create new assignments.' : 'View and submit your assignments.'}
            </CardDescription>
        </div>
        {isAdmin && <CreateAssignmentDialog />}
      </CardHeader>
      <CardContent>
        {isAdmin ? <AdminView /> : <StudentView />}
      </CardContent>
    </Card>
  );
}

function StudentView() {
    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.course}</TableCell>
                <TableCell className="font-medium">{assignment.title}</TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>
                  <Badge variant={assignment.status === 'Submitted' ? 'default' : assignment.status === 'Late' ? 'destructive' : 'secondary'}
                   className={assignment.status === 'Submitted' ? 'bg-green-500/80' : ''}>
                    {assignment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                    {assignment.status === 'Pending' && <SubmitAssignmentDialog />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    )
}

function AdminView() {
    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Assignment</TableHead>
              <TableHead>Submitted On</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.student}</TableCell>
                <TableCell>{submission.assignment}</TableCell>
                <TableCell>{submission.date}</TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    )
}


function SubmitAssignmentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"><Upload className="mr-2 h-4 w-4" /> Submit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-lg border-border/30">
        <DialogHeader>
          <DialogTitle className='font-headline'>Submit Assignment</DialogTitle>
          <DialogDescription>
            Upload your file to submit this assignment. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              File
            </Label>
            <Input id="file" type="file" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CreateAssignmentDialog() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Assignment</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-lg border-border/30">
          <DialogHeader>
            <DialogTitle className='font-headline'>Create New Assignment</DialogTitle>
            <DialogDescription>
              Fill in the details for the new assignment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" placeholder="e.g. Calculus Worksheet" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-right">
                Course
              </Label>
              <Input id="course" placeholder="e.g. MATH-101" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="due-date" className="text-right">
                Due Date
              </Label>
              <Input id="due-date" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                File
              </Label>
              <Input id="file" type="file" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }