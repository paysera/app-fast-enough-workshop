import jQuery from 'jquery';
import 'tablesorter';
import UserProvider from '../user-provider';

class TableUpdater {
    constructor() {
        this.selector = 'table.auto-update';
    }

    async processRow({user, challenge, duration}) {
        let highlight = '';
        if (await UserProvider.getCurrentUser() === user) {
            highlight = 'table-info';
        }

        const row = `
        <tr data-user="${user}" data-challenge="${challenge}" class="${highlight}">
            <th scope="row"></th>        
            <td>${user}</td>        
            <td>${challenge}</td>        
            <td>${duration}</td>        
        </tr>
        `;

        jQuery(this.selector + ` tbody tr[data-user="${user}"][data-challenge="${challenge}"]`).remove();
        jQuery(this.selector + ' tbody:last-child').append(row);

        jQuery(this.selector).trigger('update');

        jQuery(this.selector + ' tbody tr th').each((key, element) => {
            jQuery(element).html(key + 1);
        });
    }

    init() {
        jQuery(this.selector).tablesorter({
            sortList: [[3,0]]
        });
    }
}

export default new TableUpdater();
