import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GitHubEvent {
  id: string;
  type: string;
  actor: { login: string; avatar_url: string; };
  repo: { name: string; };
  payload: any;
  created_at: string;
}

const GitHubActivity: React.FC = () => {
  const [activity, setActivity] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const GITHUB_USERNAME = 'Surya9391'; // Replace with your GitHub username

  useEffect(() => {
    const fetchGitHubActivity = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.statusText}`);
        }
        const data: GitHubEvent[] = await response.json();
        setActivity(data.slice(0, 5)); // Limit to latest 5 events
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubActivity();
  }, []);

  const getEventMessage = (event: GitHubEvent) => {
    switch (event.type) {
      case 'PushEvent':
        return `Pushed to ${event.repo.name} on branch ${event.payload.ref.replace('refs/heads/', '')}`;
      case 'CreateEvent':
        return `Created a ${event.payload.ref_type} in ${event.repo.name}`;
      case 'PullRequestEvent':
        return `${event.payload.action} pull request #${event.payload.number} in ${event.repo.name}`;
      case 'IssuesEvent':
        return `${event.payload.action} issue #${event.payload.issue.number} in ${event.repo.name}`;
      case 'ForkEvent':
        return `Forked ${event.repo.name}`;
      case 'WatchEvent':
        return `Starred ${event.repo.name}`;
      default:
        return `Performed a ${event.type.replace('Event', '')} on ${event.repo.name}`;
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading GitHub activity...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading GitHub activity: {error}</div>;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#64ffda] to-[#415a77] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Latest GitHub Activity
        </motion.h2>

        <div className="space-y-6">
          {activity.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="card bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-start space-x-4"
            >
              <img src={event.actor.avatar_url} alt={event.actor.login} className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {event.actor.login} <span className="text-gray-600 dark:text-gray-400 font-normal">{getEventMessage(event)}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(event.created_at).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#64ffda] hover:bg-[#415a77] transition-colors"
          >
            View All GitHub Activity
            <svg className="ml-3 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.28 7.22a.75.75 0 00-1.06 1.06L9.94 10l-2.72 2.72a.75.75 0 101.06 1.06L11 11.06l2.72 2.72a.75.75 0 101.06-1.06L12.06 10l2.72-2.72a.75.75 0 00-1.06-1.06L11 8.94l-2.72-2.72z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity; 