import React from 'react';
import {
    Dropdown
} from 'semantic-ui-react';

export default function EmployersDropdown({handleOnEmployerSearch, handleOnEmployerChange, employers: data, selected, multiple=false }) {


    let allEmployers = []
    data.forEach(employer => {

        allEmployers.push({
            key: employer.id,
            text: employer.businessName,
            value: employer.id
        })
    })
    return (
        <div>
            {allEmployers && <Dropdown
                placeholder='Select Manager'
                fluid
                search
                clearable
                multiple={multiple}
                selection
                required
                defaultValue={selected}
                onChange={handleOnEmployerChange}
                onSearchChange={handleOnEmployerSearch}
                options={allEmployers}
            />}
        </div>

    )
}
