import React from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';

export default function SummaryCard(props){
  var icon = props.icon, title = props.title, value = props.value;
  var Icon = Lucide[icon] || Lucide.Activity;
  return React.createElement(motion.div, {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    whileHover: { scale: 1.02 },
    className: 'p-4 rounded-2xl bg-gradient-to-br from-[#071029] to-[#081126] border border-yellow-900 shadow-md hover:shadow-xl relative'
  },
    React.createElement('div', { className: 'flex items-start gap-3' },
      React.createElement('div', { className: 'p-2 rounded bg-yellow-900/20' }, React.createElement(Icon)),
      React.createElement('div', { className: 'flex-1' },
        React.createElement('div', { className: 'text-sm opacity-80' }, title),
        React.createElement('div', { className: 'text-2xl font-bold mt-2' }, value === null ? React.createElement('div', { className: 'h-6 w-24 rounded bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 animate-pulse' }) : (value === undefined ? '-' : String(value)))
      )
    )
  );
}
