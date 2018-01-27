import jQuery from 'jquery';
import PusherClient from '../pusher-client';
import TableUpdater from './table-updater';
import LeaderboardClient from './leaderboard-client';
import Notificator from './notificator';

PusherClient.subscribeToLeaderboardUpdates((data) => {
    TableUpdater.processRow(data);
    Notificator.notify(data);
});


jQuery(document).ready(() => {
    TableUpdater.init();

    jQuery('body')
        .on('click', '#v-pills-leaderboards-tab', null, () => {
            LeaderboardClient.getLeaderboard().then((data) => {
                jQuery.each(data, (key, row) => TableUpdater.processRow(row))
            })
        })
    ;
});
