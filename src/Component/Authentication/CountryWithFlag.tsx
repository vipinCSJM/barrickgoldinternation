import React from 'react';
import Select from 'react-select';
import CountryFlag from 'react-country-flag';
// @ts-ignore
import { getData } from 'country-list'; // Assuming you're using country-list package

// Define the structure of country data
interface Country {
  code: string;
  name: string;
}

// Interface for the props
interface CountryFlagSelectProps {
  SetCountryName: (country: string) => void; // Prop to pass selected country value
}

// Generate country options for the dropdown with explicit typing
const countryOptions = getData().map(({ code, name }: Country) => ({
  label: name,
  value: code,
}));

// Custom option component to render flag and country name
const customOption = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <CountryFlag
      countryCode={value}
      svg
      style={{ width: '1.5em', height: '1.5em', marginRight: '10px' }}
    />
    {label}
  </div>
);

const CountryFlagSelect: React.FC<CountryFlagSelectProps> = ({ SetCountryName }) => {
  const handleChange = (selectedOption: { label: string; value: string } | null) => {
    if (selectedOption) {
      console.log('Selected country:', selectedOption);
      SetCountryName(selectedOption.value); // Call the parent function to set the selected country value
    }
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      border: '2px solid #ccc', // Add custom border
      boxShadow: 'none', // Remove default focus box-shadow
      '&:hover': {
        borderColor: '#888', // Change border color on hover
      },
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? '#f0f0f0' : '#fff', // Change background on hover
      color: '#333', // Text color
    }),
    placeholder: (base: any) => ({
      ...base,
      color: '#888', // Custom color for placeholder
    }),
  };

  return (
    <div className="form-group">
      <Select
        options={countryOptions}
        onChange={handleChange}
        formatOptionLabel={customOption}
        placeholder="Select a country..."
        isSearchable
        styles={customStyles} // Apply custom styles
      />
    </div>
  );
};

export default CountryFlagSelect;
