import React from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';

export default function RecentActivity(props){
  var items = props.items || [];
  return React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' },
    items.slice(0,5).map(function(it, idx){
      var Icon = Lucide[it.icon] || Lucide.Activity;
      return React.createElement(motion.div, {
        key: idx,
        initial: { opacity:0, y:6 },
        animate: { opacity:1, y:0 },
        whileHover: { scale: 1.02 },
        className: 'p-4 rounded-xl border border-yellow-700 shadow-sm hover:shadow-lg bg-[#041126]'
      },
        React.createElement('div', { className: 'flex items-center gap-3' },
          React.createElement('div', { className: 'p-2 rounded bg-yellow-900/20' }, React.createElement(Icon)),
          React.createElement('div', null,
            React.createElement('div', { className: 'text-sm' }, it.text),
            React.createElement('div', { className: 'text-xs opacity-60' }, (new Date(it.time)).toLocaleString())
          )
        )
      );
    }),
    items.length === 0 ? React.createElement('div', { className: 'text-sm opacity-60' }, 'No recent activity') : null
  );
}
