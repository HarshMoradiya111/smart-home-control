import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FinancialSummary as FinancialSummaryType, Transaction } from '@/types/finance';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank,
  Wallet,
  Target
} from 'lucide-react';

interface FinancialSummaryProps {
  summary: FinancialSummaryType;
  recentTransactions: Transaction[];
}

export const FinancialSummary = ({ summary, recentTransactions }: FinancialSummaryProps) => {
  const stats = [
    {
      title: 'Total Balance',
      value: summary.netIncome,
      icon: Wallet,
      color: summary.netIncome >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: summary.netIncome >= 0 ? 'bg-green-50' : 'bg-red-50'
    },
    {
      title: 'Monthly Income',
      value: summary.monthlyIncome,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Monthly Expenses',
      value: summary.monthlyExpenses,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Savings Rate',
      value: summary.savingsRate,
      icon: PiggyBank,
      color: summary.savingsRate >= 20 ? 'text-green-600' : summary.savingsRate >= 10 ? 'text-yellow-600' : 'text-red-600',
      bgColor: summary.savingsRate >= 20 ? 'bg-green-50' : summary.savingsRate >= 10 ? 'bg-yellow-50' : 'bg-red-50',
      isPercentage: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Financial Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.isPercentage ? (
                    `${stat.value.toFixed(1)}%`
                  ) : (
                    `$${Math.abs(stat.value).toFixed(2)}`
                  )}
                </div>
                {!stat.isPercentage && stat.value < 0 && (
                  <Badge variant="destructive" className="mt-1">
                    Negative
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No recent transactions found.
            </div>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.category}
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};