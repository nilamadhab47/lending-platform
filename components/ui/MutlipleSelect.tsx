//@ts-nocheck
"use client";
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 ,
    },
  },
};



export default function MultipleSelectCheckmarks({
  label,
  variants,
  selectedValues,  // Add a prop to pass selected values
  onChange,       // Add a prop to handle onChange
}: {
  label: string;
  variants: Array<any>;
  selectedValues: Array<any>;  // Define the type of selectedValues
  onChange: (selected: Array<string>) => void; // Define the type of onChange
}){
  const [variantName, setVariantName] = React.useState([variants[0]]);

  console.log(variants[0])

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const {
      target: { value },
    } = event;

    console.log(value);

    const filterdValue = value.filter(
      (item) => variantName.findIndex((o) => o.id === item.id) >= 0
    );

    let duplicatesRemoved = value.filter((item, itemIndex) =>
      value.findIndex((o, oIndex) => o.id === item.id && oIndex !== itemIndex)
    );

    // console.log(duplicatesRemoved);

    // let map = {};

    // for (let list of value) {
    //   map[Object.values(list).join('')] = list;
    // }
    // console.log('Using Map', Object.values(map));

    let duplicateRemoved = [];

    value.forEach((item) => {
      if (duplicateRemoved.findIndex((o) => o.id === item.id) >= 0) {
        duplicateRemoved = duplicateRemoved.filter((x) => x.id === item.id);
      } else {
        duplicateRemoved.push(item);
      }
    });

    setVariantName(duplicateRemoved);
  };

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   const preventDuplicate = value.filter(
  //     (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  //   );
  //   setVariantName(
  //     // On autofill we get a the stringified value.
  //     typeof preventDuplicate === 'string'
  //       ? preventDuplicate.split(',')
  //       : preventDuplicate
  //   );
  // };

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          className="h-[50px]"
          multiple
          value={selectedValues}  // Use the selectedValues prop
          onChange={(event) => onChange(event.target.value)} // Call onChange prop
          input={<OutlinedInput label="Representative" />}
          renderValue={(selected) => selected.map((x) => x.name).join(', ')}
          MenuProps={MenuProps}
          style={{ width: '100%', position: 'relative' }}
        >
          {variants?.map((variant) => (
            <MenuItem key={variant.id} value={variant}>
              <Checkbox checked={selectedValues?.findIndex((item) => item.id === variant.id) >= 0} />
              <ListItemText primary={variant.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
