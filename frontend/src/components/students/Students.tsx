import React from 'react';
import { Search, Plus, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StudentCard from './StudentCard';
import StudentDetailModal from './StudentDetailModal';
import AddStudentModal from './AddStudentModal';
import { useStudents } from '@/hooks/useStudents';

const Students: React.FC = () => {
  const {
    filteredStudents,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedStudent,
    showAddStudent,
    openStudentDetail,
    closeStudentDetail,
    openAddStudent,
    closeAddStudent
  } = useStudents();

  return (
    <div className="space-y-6">
      {/* Header with Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={openAddStudent}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onViewDetails={openStudentDetail}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first student.'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Button onClick={openAddStudent}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Student
            </Button>
          )}
        </div>
      )}

      {/* Modals */}
      <StudentDetailModal
        student={selectedStudent}
        isOpen={!!selectedStudent}
        onClose={closeStudentDetail}
      />
      
      <AddStudentModal
        isOpen={showAddStudent}
        onClose={closeAddStudent}
      />
    </div>
  );
};

export default Students;