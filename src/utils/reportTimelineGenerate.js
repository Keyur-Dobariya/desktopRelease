export const convertToTimeline = (attendanceData, appColor) => {
    if (!attendanceData || !attendanceData.punchTime) {
        return [];
    }

    const timelineItems = [];
    
    // Add punch in/out events
    if (attendanceData.punchTime && attendanceData.punchTime.length > 0) {
        attendanceData.punchTime.forEach((punch, index) => {
            timelineItems.push({
                color: punch.type === 'in' ? appColor.success : appColor.danger,
                children: (
                    <div className="text-sm">
                        <div className="font-medium">
                            {punch.type === 'in' ? 'Punch In' : 'Punch Out'}
                        </div>
                        <div className="text-gray-500">
                            {new Date(punch.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                )
            });
        });
    }

    // Add break events
    if (attendanceData.breakTime && attendanceData.breakTime.length > 0) {
        attendanceData.breakTime.forEach((breakEvent, index) => {
            timelineItems.push({
                color: appColor.warning,
                children: (
                    <div className="text-sm">
                        <div className="font-medium">
                            {breakEvent.type === 'in' ? 'Break Start' : 'Break End'}
                        </div>
                        <div className="text-gray-500">
                            {new Date(breakEvent.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                )
            });
        });
    }

    return timelineItems;
};
