import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';

export const OverviewPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Student 👋</h1>
        <p className="text-muted-foreground">Here's an overview of your placement preparation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="ATS Score avg." value="84%" trend="+2.5%" icon={<TrendingUp className="w-4 h-4 text-green-500" />} />
        <StatCard title="Resumes Analyzed" value="12" icon={<CheckCircle2 className="w-4 h-4 text-blue-500" />} />
        <StatCard title="Jobs Matched" value="8" icon={<CheckCircle2 className="w-4 h-4 text-purple-500" />} />
        <StatCard title="Interviews Practiced" value="3" icon={<CheckCircle2 className="w-4 h-4 text-orange-500" />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                  <div>
                    <p className="font-medium">Software Engineer Role - Google</p>
                    <p className="text-sm text-muted-foreground">Analyzed yesterday</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                      89% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Action Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Missing Skill: Docker</p>
                  <p className="text-xs text-muted-foreground">Found in 4 recent job matches.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Resume Update Needed</p>
                  <p className="text-xs text-muted-foreground">Add more quantifiable achievements.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon }: any) => (
  <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium">{trend}</span> from last week
          </p>
        )}
      </CardContent>
    </Card>
  </motion.div>
);
