import React from 'react';
import {
    Dropdown
} from 'semantic-ui-react';

export default function UsersDropdown({handleOnUserSearch, handleOnUserChange, users: data, selected, multiple=false }) {


    let allUsers = []
    data.forEach(user => {

        allUsers.push({
            key: user.id,
            text: user.firstName+" "+user.lastName,
            value: user.id
        })
    })
    return (
        <div>
            {allUsers && <Dropdown
                placeholder='Select User'
                fluid
                search
                clearable
                multiple={multiple}
                selection
                required
                defaultValue={selected}
                onChange={handleOnUserChange}
                onSearchChange={handleOnUserSearch}
                options={allUsers}
            />}
        </div>

    )
}
