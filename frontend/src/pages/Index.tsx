import React, { useState } from 'react';
import { Calendar, Users, DollarSign, BarChart3, Settings, MessageSquare, BookOpen, Home, Menu, X, Search, Plus, Filter, MoreHorizontal, Phone, Mail, MapPin, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false);

  // Mock data
  const stats = {
    totalRevenue: 12450,
    monthlyRevenue: 3200,
    totalStudents: 24,
    activeStudents: 18,
    upcomingLessons: 8,
    completedLessons: 156
  };

  const students = [
    {
      id: 1,
      name: 'Emma Johnson',
      email: 'emma.johnson@email.com',
      phone: '(555) 123-4567',
      instrument: 'Piano',
      level: 'Intermediate',
      status: 'Active',
      joinDate: '2024-01-15',
      lastLesson: '2024-01-20',
      nextLesson: '2024-01-25 2:00 PM',
      totalLessons: 24,
      parentName: 'Sarah Johnson',
      parentEmail: 'sarah.johnson@email.com',
      parentPhone: '(555) 123-4567',
      address: '123 Main St, Anytown, ST 12345',
      notes: 'Very dedicated student. Working on Bach Inventions.',
      goals: ['Master Bach Invention No. 1', 'Improve sight-reading', 'Learn basic music theory'],
      avatar: null
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '(555) 234-5678',
      instrument: 'Guitar',
      level: 'Beginner',
      status: 'Active',
      joinDate: '2024-02-01',
      lastLesson: '2024-01-22',
      nextLesson: '2024-01-26 3:30 PM',
      totalLessons: 12,
      parentName: 'Lisa Chen',
      parentEmail: 'lisa.chen@email.com',
      parentPhone: '(555) 234-5678',
      address: '456 Oak Ave, Anytown, ST 12345',
      notes: 'Enthusiastic beginner. Loves rock music.',
      goals: ['Learn basic chords', 'Play first song', 'Develop finger strength'],
      avatar: null
    },
    {
      id: 3,
      name: 'Sarah Williams',
      email: 'sarah.williams@email.com',
      phone: '(555) 345-6789',
      instrument: 'Voice',
      level: 'Advanced',
      status: 'Active',
      joinDate: '2023-09-10',
      lastLesson: '2024-01-19',
      nextLesson: '2024-01-27 10:00 AM',
      totalLessons: 45,
      parentName: null,
      parentEmail: null,
      parentPhone: null,
      address: '789 Pine St, Anytown, ST 12345',
      notes: 'Preparing for college auditions. Excellent range.',
      goals: ['Perfect audition pieces', 'Expand repertoire', 'Improve stage presence'],
      avatar: null
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '(555) 456-7890',
      instrument: 'Piano',
      level: 'Beginner',
      status: 'Inactive',
      joinDate: '2023-11-20',
      lastLesson: '2024-01-10',
      nextLesson: null,
      totalLessons: 8,
      parentName: 'Mark Brown',
      parentEmail: 'mark.brown@email.com',
      parentPhone: '(555) 456-7890',
      address: '321 Elm St, Anytown, ST 12345',
      notes: 'Taking a break due to school commitments.',
      goals: ['Learn basic scales', 'Play simple songs'],
      avatar: null
    },
    {
      id: 5,
      name: 'Jessica Martinez',
      email: 'jessica.martinez@email.com',
      phone: '(555) 567-8901',
      instrument: 'Violin',
      level: 'Intermediate',
      status: 'Active',
      joinDate: '2024-01-05',
      lastLesson: '2024-01-21',
      nextLesson: '2024-01-28 4:00 PM',
      totalLessons: 18,
      parentName: 'Maria Martinez',
      parentEmail: 'maria.martinez@email.com',
      parentPhone: '(555) 567-8901',
      address: '654 Maple Dr, Anytown, ST 12345',
      notes: 'Great technique. Working on vibrato.',
      goals: ['Master vibrato technique', 'Learn advanced pieces', 'Prepare for recital'],
      avatar: null
    }
  ];

  const upcomingLessons = [
    { id: 1, student: 'Emma Johnson', time: '2:00 PM', date: 'Today', type: 'Piano Lesson' },
    { id: 2, student: 'Michael Chen', time: '3:30 PM', date: 'Today', type: 'Guitar Lesson' },
    { id: 3, student: 'Sarah Williams', time: '10:00 AM', date: 'Tomorrow', type: 'Voice Lesson' },
    { id: 4, student: 'David Brown', time: '4:00 PM', date: 'Tomorrow', type: 'Piano Lesson' }
  ];

  const recentActivity = [
    { id: 1, action: 'New booking', student: 'Emma Johnson', time: '2 hours ago' },
    { id: 2, action: 'Payment received', student: 'Michael Chen', time: '4 hours ago' },
    { id: 3, action: 'Lesson completed', student: 'Sarah Williams', time: '1 day ago' },
    { id: 4, action: 'Progress updated', student: 'David Brown', time: '2 days ago' }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'progress', label: 'Progress', icon: BookOpen },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStudents}</div>
            <p className="text-xs text-muted-foreground">of {stats.totalStudents} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedLessons}</div>
            <p className="text-xs text-muted-foreground">+23 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Lessons */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Lessons</CardTitle>
            <CardDescription>Your next {upcomingLessons.length} scheduled lessons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{lesson.student}</p>
                    <p className="text-sm text-muted-foreground">{lesson.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{lesson.time}</p>
                    <p className="text-sm text-muted-foreground">{lesson.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" onClick={() => setActiveSection('calendar')}>
              View Full Calendar
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your coaching business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span> - {activity.student}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your coaching business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col space-y-2" onClick={() => setActiveSection('calendar')}>
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Schedule Lesson</span>
            </Button>
            <Button className="h-20 flex flex-col space-y-2" variant="outline" onClick={() => setShowAddStudent(true)}>
              <Users className="h-5 w-5" />
              <span className="text-sm">Add Student</span>
            </Button>
            <Button className="h-20 flex flex-col space-y-2" variant="outline" onClick={() => setActiveSection('payments')}>
              <DollarSign className="h-5 w-5" />
              <span className="text-sm">Record Payment</span>
            </Button>
            <Button className="h-20 flex flex-col space-y-2" variant="outline" onClick={() => setActiveSection('progress')}>
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">Update Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStudents = () => (
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
          <Button onClick={() => setShowAddStudent(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <CardDescription>{student.instrument} • {student.level}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedStudent(student)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Lesson
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                  {student.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{student.totalLessons} lessons</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  {student.email}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {student.phone}
                </div>
                {student.nextLesson && (
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next: {student.nextLesson}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setSelectedStudent(student)}
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
            <Button onClick={() => setShowAddStudent(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Student
            </Button>
          )}
        </div>
      )}
    </div>
  );

  const renderPlaceholder = (section: string) => (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">The {section} section is under construction</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h1 className="text-xl font-bold">CoachPro</h1>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-white lg:shadow-sm lg:flex lg:flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">CoachPro</h1>
          <p className="text-sm text-gray-500 mt-1">Music Coaching Platform</p>
        </div>
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-xl font-semibold capitalize">
                  {activeSection === 'dashboard' ? 'Dashboard' : activeSection}
                </h2>
                <p className="text-sm text-gray-500">
                  {activeSection === 'dashboard' 
                    ? 'Welcome back! Here\'s what\'s happening with your coaching business.'
                    : activeSection === 'students'
                    ? `Manage your ${filteredStudents.length} students`
                    : `Manage your ${activeSection} here`
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                {stats.upcomingLessons} lessons today
              </Badge>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                C
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'students' && renderStudents()}
          {activeSection !== 'dashboard' && activeSection !== 'students' && renderPlaceholder(activeSection)}
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedStudent.avatar} />
                  <AvatarFallback>{selectedStudent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div>{selectedStudent.name}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {selectedStudent.instrument} • {selectedStudent.level}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      {selectedStudent.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      {selectedStudent.phone}
                    </div>
                    <div className="flex items-start text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                      {selectedStudent.address}
                    </div>
                  </div>
                  {selectedStudent.parentName && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Parent/Guardian</h4>
                      <div className="text-sm">{selectedStudent.parentName}</div>
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {selectedStudent.parentEmail}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        {selectedStudent.parentPhone}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Lesson Information */}
              <div>
                <h3 className="font-semibold mb-3">Lesson Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <Badge variant={selectedStudent.status === 'Active' ? 'default' : 'secondary'}>
                      {selectedStudent.status}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Lessons</div>
                    <div className="font-medium">{selectedStudent.totalLessons}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Join Date</div>
                    <div className="font-medium">{new Date(selectedStudent.joinDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Last Lesson</div>
                    <div className="font-medium">{new Date(selectedStudent.lastLesson).toLocaleDateString()}</div>
                  </div>
                </div>
                {selectedStudent.nextLesson && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">Next Lesson</div>
                    <div className="font-medium text-blue-700">{selectedStudent.nextLesson}</div>
                  </div>
                )}
              </div>

              {/* Goals */}
              <div>
                <h3 className="font-semibold mb-3">Current Goals</h3>
                <div className="space-y-2">
                  {selectedStudent.goals.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="font-semibold mb-3">Notes</h3>
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  {selectedStudent.notes}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Lesson
                </Button>
                <Button variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Student Modal */}
      {showAddStudent && (
        <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter the student's information to add them to your roster.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="Enter student's name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="student@email.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="instrument">Instrument *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select instrument" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="piano">Piano</SelectItem>
                      <SelectItem value="guitar">Guitar</SelectItem>
                      <SelectItem value="voice">Voice</SelectItem>
                      <SelectItem value="violin">Violin</SelectItem>
                      <SelectItem value="drums">Drums</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St, City, State 12345" />
              </div>

              <div>
                <Label htmlFor="parent-name">Parent/Guardian Name</Label>
                <Input id="parent-name" placeholder="For students under 18" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parent-email">Parent Email</Label>
                  <Input id="parent-email" type="email" placeholder="parent@email.com" />
                </div>
                <div>
                  <Label htmlFor="parent-phone">Parent Phone</Label>
                  <Input id="parent-phone" placeholder="(555) 123-4567" />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Any additional notes about the student..." />
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Add Student</Button>
                <Button variant="outline" onClick={() => setShowAddStudent(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;