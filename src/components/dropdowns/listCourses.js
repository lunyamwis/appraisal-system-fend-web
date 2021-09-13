import React from 'react';
import {
    Dropdown
} from 'semantic-ui-react';

export default function CoursesDropdown({handleOnCourseSearch, handleOnCourseChange, courses: data, selected, multiple=false }) {


    let allCourses = []
    data.forEach(course => {

        allCourses.push({
            key: course.id,
            text: course.courseName,
            value: course.id
        })
    })
    return (
        <div>
            {allCourses && <Dropdown
                placeholder='Select Course'
                fluid
                search
                clearable
                multiple={multiple}
                selection
                required
                defaultValue={selected}
                onChange={handleOnCourseChange}
                onSearchChange={handleOnCourseSearch}
                options={allCourses}
            />}
        </div>

    )
}
