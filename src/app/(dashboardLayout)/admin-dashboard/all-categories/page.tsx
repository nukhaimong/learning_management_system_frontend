import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { getCategories } from '@/services/category/category.server.service';

interface Category {
  data: {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

const AllCategories = async () => {
  const { data }: Category = await getCategories();

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Manage Categories
        </h2>
        <Badge variant="secondary" className="px-3 py-1">
          {data?.length} Total
        </Badge>
      </div>

      <div className="p-0">
        <Table>
          <TableCaption className="pb-4">
            A list of categories for your Learning Management System App.
          </TableCaption>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[80px] text-center">#</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length > 0 ? (
              data?.map((category, index) => (
                <TableRow
                  key={category.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <TableCell className="text-center font-medium text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-foreground">
                      {category.title}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(category.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-right pr-6 space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-32 text-center text-muted-foreground"
                >
                  No categories found. Start by adding one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllCategories;
