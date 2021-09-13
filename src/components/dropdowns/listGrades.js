import React from 'react';
import {
    Dropdown
} from 'semantic-ui-react';

export default function GradeDropdown({handleOnGradeSearch, handleOnGradeChange, grades: data, selected, multiple=false }) {


    let allGrades = []
    data.forEach(grade => {

        allGrades.push({
            key: grade.id,
            text: grade.gradeName,
            value: grade.id
        })
    })
    return (
        <div>
            {allGrades && <Dropdown
                placeholder='Select grade'
                fluid
                search
                clearable
                multiple={multiple}
                selection
                required
                defaultValue={selected}
                onChange={handleOnGradeChange}
                onSearchChange={handleOnGradeSearch}
                options={allGrades}
            />}
        </div>

    )
}
