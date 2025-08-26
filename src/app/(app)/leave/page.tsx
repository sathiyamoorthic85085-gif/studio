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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCurrentUser } from '@/lib/auth';
import { Check, X } from 'lucide-react';

const leaveRequests = [
  { id: 'LR001', studentName: 'John Doe', studentId: 'S12345', dateFrom: '2023-11-10', dateTo: '2023-11-11', reason: 'Family event', status: 'Pending' },
  { id: 'LR002', studentName: 'Jane Smith', studentId: 'S12346', dateFrom: '2023-11-12', dateTo: '2023-11-12', reason: 'Medical appointment', status: 'Approved' },
  { id: 'LR003', studentName: 'Peter Jones', studentId: 'S12347', dateFrom: '2023-11-08', dateTo: '2023-11-09', reason: 'Not specified', status: 'Rejected' },
];

export default async function LeavePage() {
  const user = await getCurrentUser();
  const isAdmin = user?.role === 'hod' || user?.role === 'advisor';

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <Card className="bg-card/50 backdrop-blur-lg border-border/30 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Leave Requests</CardTitle>
            <CardDescription>
              {isAdmin ? 'Review and manage student leave requests.' : 'Your submitted leave requests.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeaveRequestsTable isAdmin={isAdmin} />
          </CardContent>
        </Card>
      </div>
      {!isAdmin && (
        <div className="lg:col-span-2">
          <LeaveRequestForm />
        </div>
      )}
    </div>
  );
}

function LeaveRequestsTable({ isAdmin }: { isAdmin: boolean }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {isAdmin && <TableHead>Student</TableHead>}
          <TableHead>Dates</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveRequests.map((request) => (
          <TableRow key={request.id}>
            {isAdmin && <TableCell className="font-medium">{request.studentName}</TableCell>}
            <TableCell>{request.dateFrom} to {request.dateTo}</TableCell>
            <TableCell>
              <Badge variant={request.status === 'Approved' ? 'default' : request.status === 'Rejected' ? 'destructive' : 'secondary'}
              className={request.status === 'Approved' ? 'bg-green-500/80' : ''}>
                {request.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {isAdmin && request.status === 'Pending' && (
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="icon" className="h-8 w-8 text-green-500">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 text-red-500">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function LeaveRequestForm() {
    return (
        <Card className="bg-card/50 backdrop-blur-lg border-border/30 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Submit a Leave Request</CardTitle>
            <CardDescription>
              Fill out the form below to request leave.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="from-date">From</Label>
                    <Input id="from-date" type="date" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="to-date">To</Label>
                    <Input id="to-date" type="date" />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="reason">Reason for Leave</Label>
                <Textarea id="reason" placeholder="Please provide a reason for your absence..." />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Submit Request</Button>
          </CardFooter>
        </Card>
    );
}
