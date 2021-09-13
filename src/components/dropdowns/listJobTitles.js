import React from 'react';
import {
    Dropdown
} from 'semantic-ui-react';


export default function TitlesDropdown({ handleOnTitleSearch, handleOnTitleChange, titles: data, selected, multiple = false }) {


    let allTitles = []
    data.forEach(title => {

        allTitles.push({
            key: title.id,
            text: title.titleName,
            value: title.id
        })
    })
    return (
        <div>
            {allTitles && <Dropdown
                placeholder='Select Title'
                fluid
                search
                clearable
                multiple={multiple}
                selection
                required
                defaultValue={selected}
                onChange={handleOnTitleChange}
                onSearchChange={handleOnTitleSearch}
                options={allTitles}
            />}
        </div>

    )
}
