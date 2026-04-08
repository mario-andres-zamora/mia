import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReports } from '../hooks/useReports';
import { ReportsSkeleton } from '../components/skeletons/ReportsSkeleton';
import ReportsHeader from '../components/reports/ReportsHeader';
import ComplianceSummary from '../components/reports/ComplianceSummary';
import ComplianceCharts from '../components/reports/ComplianceCharts';
import PerformanceTable from '../components/reports/PerformanceTable';
import DistributionPie from '../components/reports/DistributionPie';
import RiskAlerts from '../components/reports/RiskAlerts';
import DetailedUserList from '../components/reports/DetailedUserList';

export default function Reports() {
    const navigate = useNavigate();
    const {
        reportData,
        loading,
        searchTerm,
        setSearchTerm,
        view,
        setView,
        chartType,
        setChartType,
        sortConfig,
        requestSort,
        handleExportCSV,
        handleSendReminders,
        filteredUsers,
        sortedDepartments
    } = useReports();

    if (loading) {
        return <ReportsSkeleton />;
    }

    if (!reportData) return null;

    const { summary, departments, atRisk, moduleCompliance } = reportData;
    const activeChartData = (chartType === 'departments' ? departments : moduleCompliance) || [];

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
            <ReportsHeader 
                view={view}
                onToggleView={() => setView(view === 'summary' ? 'detailed' : 'summary')}
                onExport={handleExportCSV}
                onBack={() => navigate('/admin')}
            />

            {view === 'summary' ? (
                <>
                    <ComplianceSummary summary={summary} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-10">
                            <ComplianceCharts 
                                chartType={chartType}
                                onTypeChange={setChartType}
                                data={activeChartData}
                            />

                            <PerformanceTable 
                                departments={sortedDepartments}
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                                onSort={requestSort}
                                sortConfig={sortConfig}
                            />
                        </div>

                        <div className="space-y-10">
                            <DistributionPie 
                                avgCompletion={summary.avgCompletion}
                                summary={summary}
                            />

                            <RiskAlerts 
                                atRisk={atRisk}
                                onSendReminders={handleSendReminders}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <DetailedUserList 
                    users={filteredUsers}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />
            )}
        </div>
    );
}
