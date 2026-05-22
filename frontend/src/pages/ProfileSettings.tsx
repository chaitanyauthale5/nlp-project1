import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { User, Mail, GraduationCap, Link as LinkIcon } from 'lucide-react';

export const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and placement preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="col-span-1 border-none shadow-none bg-transparent">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 border-4 border-background shadow-xl">
              <User className="w-16 h-16" />
            </div>
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <p className="text-muted-foreground font-medium">Computer Science, Senior</p>
            <div className="mt-6 w-full space-y-3">
              <Button className="w-full">Edit Profile</Button>
              <Button variant="outline" className="w-full">Upload New Resume</Button>
            </div>
          </div>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                  <User className="w-3 h-3" /> Full Name
                </label>
                <p className="font-medium text-sm">Alex Johnson</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email Address
                </label>
                <p className="font-medium text-sm">alex.j@university.edu</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                  <GraduationCap className="w-3 h-3" /> University
                </label>
                <p className="font-medium text-sm">Tech University of Engineering</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                  <LinkIcon className="w-3 h-3" /> Portfolio URL
                </label>
                <p className="font-medium text-sm text-primary">github.com/alexj</p>
              </div>
            </div>

            <div className="pt-6 border-t mt-6">
              <h3 className="font-semibold mb-4">Target Roles</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">Software Engineer</span>
                <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">Frontend Developer</span>
                <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">Full Stack</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your application experience.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Switch between light and dark themes.</p>
            </div>
            <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-background border shadow-sm rounded-full absolute top-0.5 left-0.5" />
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-t pt-4">
            <div>
              <p className="font-medium">Reduced Motion</p>
              <p className="text-sm text-muted-foreground">Disable animations for a simpler UI.</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-background shadow-sm rounded-full absolute top-0.5 right-0.5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Email Alerts</p>
              <p className="text-sm text-muted-foreground">Receive weekly placement tips.</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-background shadow-sm rounded-full absolute top-0.5 right-0.5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
