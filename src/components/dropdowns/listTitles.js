import React from "react";
import { Dropdown } from "semantic-ui-react";

export default function TitleDropDown({
  handleOnTitleSearch,
  handleOnTitleChange,
  titles: data,
  selected,
  multiple = true,
}) {
  let allTitles = [];
  data.forEach((title) => {
    allTitles.push({
      key: title.id,
      text: title.TitleName,
      value: title.id,
    });
  });
  return (
    <div>
      {allTitles && (
        <Dropdown
          placeholder="Select Title"
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
        />
      )}
    </div>
  );
}
