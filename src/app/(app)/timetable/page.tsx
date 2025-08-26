import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const timetableData = [
  { time: '09:00 - 10:00', Mon: 'Maths', Tue: 'Physics', Wed: 'Maths', Thu: 'Physics', Fri: 'Chemistry' },
  { time: '10:00 - 11:00', Mon: 'Physics', Tue: 'Chemistry', Wed: 'Physics', Thu: 'Chemistry', Fri: 'Maths' },
  { time: '11:00 - 12:00', Mon: 'Chemistry', Tue: 'Maths', Wed: 'Chemistry', Thu: 'Maths', Fri: 'Physics' },
  { time: '12:00 - 01:00', Mon: 'LUNCH', Tue: 'LUNCH', Wed: 'LUNCH', Thu: 'LUNCH', Fri: 'LUNCH' },
  { time: '01:00 - 02:00', Mon: 'Lab', Tue: 'Sports', Wed: 'Lab', Thu: 'Sports', Fri: 'Lab' },
  { time: '02:00 - 03:00', Mon: 'Lab', Tue: 'Library', Wed: 'Lab', Thu: 'Library', Fri: 'Lab' },
];

export default function TimetablePage() {
  return (
    <Card className="bg-card/50 backdrop-blur-lg border-border/30 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Class Timetable</CardTitle>
        <CardDescription>
          Weekly schedule for your classes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Time</TableHead>
              <TableHead>Monday</TableHead>
              <TableHead>Tuesday</TableHead>
              <TableHead>Wednesday</TableHead>
              <TableHead>Thursday</TableHead>
              <TableHead>Friday</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timetableData.map((row) => (
              <TableRow key={row.time} className={row.Mon === 'LUNCH' ? 'bg-muted/50 font-bold' : ''}>
                <TableCell className="font-medium">{row.time}</TableCell>
                <TableCell>{row.Mon}</TableCell>
                <TableCell>{row.Tue}</TableCell>
                <TableCell>{row.Wed}</TableCell>
                <TableCell>{row.Thu}</TableCell>
                <TableCell>{row.Fri}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}
