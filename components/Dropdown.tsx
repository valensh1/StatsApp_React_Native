import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../styles/colors_app';

export interface DropdownData {
  label: string;
  value: string;
}

interface DropdownProps {
  data: DropdownData[];
  onSelect: (item: string) => void;
}

const DropdownComponent: React.FC<DropdownProps> = ({ data, onSelect }) => {
  console.log('This is the data for dropdown', data);
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const dropdownSelectionHandler = (role: string) => {
    setValue(role);
    setIsFocus(false);
    onSelect(role);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.globalGray }]}
        placeholderStyle={styles.placeholderStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Role' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          dropdownSelectionHandler(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={colors.globalGray}
            name="safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    borderColor: colors.globalGray,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    color: colors.globalGray,
  },
});
