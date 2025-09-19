'use client'

import React from 'react';
import { Search, Filter, Plus, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StudentCard from './StudentCard';
import StudentTable from './StudentTable';
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
    levelFilter,
    setLevelFilter,
    playStyleFilter,
    setPlayStyleFilter,
    selectedStudent,
    isDetailModalOpen,
    isAddModalOpen,
    openDetailModal,
    closeDetailModal,
    openAddStudent,
    closeAddStudent
  } = useStudents();

  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>('grid');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-muted-foreground">
            Manage your {filteredStudents.length} pickleball students
          </p>
        </div>
        <Button onClick={openAddStudent}>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
          <CardDescription>Filter and search your student roster</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={levelFilter} onValueChange={(value: any) => setLevelFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={playStyleFilter} onValueChange={(value: any) => setPlayStyleFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Play Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Styles</SelectItem>
                <SelectItem value="singles">Singles</SelectItem>
                <SelectItem value="doubles">Doubles</SelectItem>
                <SelectItem value="tournament">Tournament</SelectItem>
                <SelectItem value="recreational">Recreational</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center gap-2">
        <Badge variant="secondary">
          {filteredStudents.length} students found
        </Badge>
        {searchTerm && (
          <Badge variant="outline">
            Search: "{searchTerm}"
          </Badge>
        )}
        {statusFilter !== 'all' && (
          <Badge variant="outline">
            Status: {statusFilter}
          </Badge>
        )}
        {levelFilter !== 'all' && (
          <Badge variant="outline">
            Level: {levelFilter}
          </Badge>
        )}
        {playStyleFilter !== 'all' && (
          <Badge variant="outline">
            Style: {playStyleFilter}
          </Badge>
        )}
      </div>

      {/* Students Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onViewDetails={openDetailModal}
            />
          ))}
        </div>
      ) : (
        <StudentTable
          students={filteredStudents}
          onViewDetails={openDetailModal}
        />
      )}

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No students found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or add a new student to get started.
              </p>
              <Button onClick={openAddStudent}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Student
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <StudentDetailModal
        student={selectedStudent}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
      />
      
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={closeAddStudent}
      />
    </div>
  );
};

export default Students;