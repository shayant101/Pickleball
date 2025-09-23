import { apiService } from './api';
import { API_ENDPOINTS } from '@/config/api';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  playStyle: string;
  level: string;
  status: string;
  joinDate: string;
  lastSession: string | null;
  nextSession: string | null;
  totalSessions: number;
  address: string;
  notes: string;
  goals: string[];
  guardians?: Guardian[];
}

export interface Guardian {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: number;
}

export interface CreateStudentData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  playStyle: string;
  level: string;
  address: string;
  notes?: string;
  goals?: string[];
  guardians?: Omit<Guardian, 'id' | 'studentId'>[];
}

export const studentService = {
  async getStudents(): Promise<Student[]> {
    try {
      const response = await apiService.get<Student[]>('/students');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  async getStudent(id: number): Promise<Student> {
    try {
      const response = await apiService.get<Student>(`/students/${id}`);
      if (!response.data) {
        throw new Error('Student not found');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  },

  async createStudent(studentData: CreateStudentData): Promise<Student> {
    try {
      const response = await apiService.post<Student>('/students', studentData);
      if (!response.data) {
        throw new Error('Failed to create student');
      }
      return response.data;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },

  async updateStudent(id: number, studentData: Partial<CreateStudentData>): Promise<Student> {
    try {
      const response = await apiService.put<Student>(`/students/${id}`, studentData);
      if (!response.data) {
        throw new Error('Failed to update student');
      }
      return response.data;
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },

  async deleteStudent(id: number): Promise<void> {
    try {
      await apiService.delete(`/students/${id}`);
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  },
};

export default studentService;