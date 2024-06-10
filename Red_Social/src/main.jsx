import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(en);

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
) 
