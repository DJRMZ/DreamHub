import * as React from "react";
import { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";

const DreamCalendar = () => {
  const [items, setItems] = useState({});

  let today = new Date().toISOString().substring(0, 10);
  console.log(today);

  // THIS IS ALL TEMP RANDOMIZER TO LOAD ITEMS FROM THE THEIR EXAMPLE

  // WE NEED TO CREATE A FUNCTION THAT WILL SAVE ITEMS FROM THE IMAGE GENERATOR, DREAM JOURNAL TO THE SUPABASE DB, 
  // A FUNCTION THAT WILL LOAD ITEMS FROM THE SUPABASE DB
  // AND A FUNCTION THAT WILL DELETE ITEMS FROM THE SUPABASE DB

  // SOMETHING SIMILAR TO THE IMPLEMENTATION OF THE TODOS EXAMPLE HERE
  // https://clerk.dev/blog/nextjs-supabase-todos-with-multifactor-authentication

  const loadItems = (day) => {
    setTimeout(() => {
      // for each day in range -15 to 85
      for (let i = -15; i < 85; i++) {
        // generate the time for that day
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        // if there is not an item already for that time
        if (!items[strTime]) {
          // create an array for that time
          items[strTime] = [];

          // generate a random number of items for that day
          const numItems = Math.floor(Math.random() * 3 + 1);

          // for each item
          for (let j = 0; j < numItems; j++) {
            // create a random height for each item
            const height = Math.max(50, Math.floor(Math.random() * 150));

            // create the item
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: height,
            });
          }
        }
      }
      // console.log(items);

      // create a new array for items
      const newItems = {};

      // for each item in the array of items
      Object.keys(items).forEach((key) => {
        // create a new item for that array
        newItems[key] = items[key];
      });

      // set the new items for the array of items
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (row1, row2) => {
    return row1.name !== row2.name;
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      selected={today}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
    />
  );
}

export default DreamCalendar;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
