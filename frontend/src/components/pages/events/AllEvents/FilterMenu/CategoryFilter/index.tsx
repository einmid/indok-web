import { Category } from "@interfaces/events";
import React, { useState } from "react";
import { List, ListItem, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { FilterQuery } from "../..";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@graphql/events/queries";

interface Props {
  filters: FilterQuery;
  onFiltersChange: (query: FilterQuery) => void;
  classes: any;
}

const CategoryFilter: React.FC<Props> = ({ filters, onFiltersChange, classes }) => {
  const [open, setOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_CATEGORIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <List component="div" className={classes.root} disablePadding>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText primary={"Kategorier"} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.allCategories.map((category: Category) => (
            <ListItem
              key={category.name}
              button
              className={classes.nested}
              selected={filters.category === category.name}
              onClick={() => onFiltersChange({ ...filters, category: category.name })}
            >
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default CategoryFilter;
