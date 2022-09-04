export const someVariable = 2;

if (chrome.alarms) {
    const createAlarm = () => {
        chrome.alarms.create('nosleep', {
            when: Date.now() + 1000
        });
    };

    chrome.alarms.onAlarm.addListener(() => {
        console.log('Alarm');
        createAlarm();
    });

    createAlarm();
}
