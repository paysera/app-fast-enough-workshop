import jQuery from 'jquery';
import PusherClient from '../pusher-client';
import TableUpdater from './table-updater';
import LeaderboardClient from './leaderboard-client';
import Toaster from './toaster';

PusherClient.subscribeToLeaderboardUpdates((data) => {
    TableUpdater.processRow(data);
    Toaster.showToast(data);
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
