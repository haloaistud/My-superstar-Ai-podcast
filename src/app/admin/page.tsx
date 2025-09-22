'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const AdminMode = () => {
    const router = useRouter();
    return (
        <div id="adminMode" className="main-content active">
            <div className="header">
                <div className="header-content">
                    <div className="logo">SUPERSTAR PODCAST HUB</div>
                     <div className="subtitle">Admin Dashboard</div>
                </div>
                 <Button onClick={() => router.push('/')}>Go Home</Button>
            </div>
            <div className="admin-panel">
                <div className="admin-card">
                    <h3>Platform Statistics</h3>
                    <div className="stat-row"><span>Total Users:</span> <strong>15,789</strong></div>
                    <div className="stat-row"><span>Live Channels:</span> <strong>2</strong></div>
                    <div className="stat-row"><span>Peak Viewers (24h):</span> <strong>8,192</strong></div>
                    <div className="stat-row"><span>Server Uptime:</span> <strong>99.98%</strong></div>
                </div>
                <div className="admin-card">
                    <h3>Live Channels</h3>
                    <div className="stat-row"><span>IndieVibe FM</span> <button className="control-btn danger">Shutdown</button></div>
                    <div className="stat-row"><span>RealTalk 24/7</span> <button className="control-btn danger">Shutdown</button></div>
                </div>
                 <div className="admin-card">
                    <h3>System Control</h3>
                    <button className="control-btn">Reboot Media Server</button>
                    <button className="control-btn success mt-2">Send Global Notification</button>
                </div>
            </div>
        </div>
    )
};

export default AdminMode;
