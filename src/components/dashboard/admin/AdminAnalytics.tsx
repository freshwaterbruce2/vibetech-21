import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, Users, FileText, TrendingUp, Calendar } from 'lucide-react';

interface AnalyticsData {
  totalLeads: number;
  totalUsers: number;
  totalContent: number;
  leadsThisWeek: number;
  leadsThisMonth: number;
}

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch total leads
        const { count: totalLeads } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true });

        // Fetch total users (from user_roles)
        const { count: totalUsers } = await supabase
          .from('user_roles')
          .select('*', { count: 'exact', head: true });

        // Fetch total saved content
        const { count: totalContent } = await supabase
          .from('saved_content')
          .select('*', { count: 'exact', head: true });

        // Leads this week
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const { count: leadsThisWeek } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', weekAgo.toISOString());

        // Leads this month
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        const { count: leadsThisMonth } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', monthAgo.toISOString());

        setAnalytics({
          totalLeads: totalLeads || 0,
          totalUsers: totalUsers || 0,
          totalContent: totalContent || 0,
          leadsThisWeek: leadsThisWeek || 0,
          leadsThisMonth: leadsThisMonth || 0,
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const stats = [
    {
      title: 'Total Leads',
      value: analytics?.totalLeads || 0,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Users',
      value: analytics?.totalUsers || 0,
      icon: Users,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Saved Content',
      value: analytics?.totalContent || 0,
      icon: FileText,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Leads This Week',
      value: analytics?.leadsThisWeek || 0,
      icon: TrendingUp,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Leads This Month',
      value: analytics?.leadsThisMonth || 0,
      icon: Calendar,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Platform Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${stat.bgColor} rounded-lg p-4 border border-border/30`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-xs text-muted-foreground">{stat.title}</span>
                  </div>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/30">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Quick Insights
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Weekly lead conversion rate:{' '}
                <span className="text-foreground font-medium">
                  {analytics && analytics.totalLeads > 0
                    ? ((analytics.leadsThisWeek / analytics.totalLeads) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </p>
              <p>
                • Average leads per user:{' '}
                <span className="text-foreground font-medium">
                  {analytics && analytics.totalUsers > 0
                    ? (analytics.totalLeads / analytics.totalUsers).toFixed(1)
                    : 0}
                </span>
              </p>
              <p>
                • Content pieces per user:{' '}
                <span className="text-foreground font-medium">
                  {analytics && analytics.totalUsers > 0
                    ? (analytics.totalContent / analytics.totalUsers).toFixed(1)
                    : 0}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminAnalytics;
