interface Issue {
    id: string
    reportedBy: string
    description: string
  }
  
  const recentIssues: Issue[] = [
    {
      id: '647',
      reportedBy: 'Wade Warren',
      description: 'Refund not received yet',
    },
    {
      id: '883',
      reportedBy: 'Esther Howard',
      description: 'Late delivery',
    },
    {
      id: '883',
      reportedBy: 'Esther Howard',
      description: 'Late delivery',
    },
    {
      id: '883',
      reportedBy: 'Esther Howard',
      description: 'Wrong product received',
    },
    {
      id: '883',
      reportedBy: 'Esther Howard',
      description: 'Wrong Transaction',
    },
  ]
  
  export function RecentIssuesTable() {
    return (
      <div className="rounded-lg border bg-card">
        <div className="p-4 font-semibold">Recent Issues</div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Issue ID</th>
                <th className="px-4 py-3">Reported By</th>
                <th className="px-4 py-3">Short Description</th>
              </tr>
            </thead>
            <tbody>
              {recentIssues.map((issue, index) => (
                <tr
                  key={index}
                  className="border-t bg-white hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{issue.id}</td>
                  <td className="px-4 py-3">{issue.reportedBy}</td>
                  <td className="px-4 py-3">{issue.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  