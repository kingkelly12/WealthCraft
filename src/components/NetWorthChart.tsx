import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Mock data for net worth growth over 12 months
const netWorthData = [
  { month: 'Jan', netWorth: 85000, assets: 120000, liabilities: 35000 },
  { month: 'Feb', netWorth: 88500, assets: 125000, liabilities: 36500 },
  { month: 'Mar', netWorth: 92000, assets: 132000, liabilities: 40000 },
  { month: 'Apr', netWorth: 95800, assets: 138000, liabilities: 42200 },
  { month: 'May', netWorth: 101200, assets: 145000, liabilities: 43800 },
  { month: 'Jun', netWorth: 106500, assets: 152000, liabilities: 45500 },
  { month: 'Jul', netWorth: 110300, assets: 158000, liabilities: 47700 },
  { month: 'Aug', netWorth: 115600, assets: 165000, liabilities: 49400 },
  { month: 'Sep', netWorth: 118900, assets: 171000, liabilities: 52100 },
  { month: 'Oct', netWorth: 122400, assets: 178000, liabilities: 55600 },
  { month: 'Nov', netWorth: 125750, assets: 185000, liabilities: 59250 },
  { month: 'Dec', netWorth: 125750, assets: 185000, liabilities: 59250 },
];

export function NetWorthChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={netWorthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              color: 'hsl(var(--card-foreground))'
            }}
            formatter={(value: number, name: string) => [
              `$${value.toLocaleString()}`, 
              name === 'netWorth' ? 'Net Worth' : name
            ]}
            labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
          />
          <Area 
            type="monotone" 
            dataKey="netWorth" 
            stroke="hsl(var(--primary))" 
            fillOpacity={1} 
            fill="url(#netWorthGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}