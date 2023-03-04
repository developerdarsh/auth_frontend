import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';


export const mainListItems=(

    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <Link to={'/orders'} style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItemButton>
        </Link>
    </React.Fragment>
);

export const secondaryListItems=(
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>

    </React.Fragment>
);