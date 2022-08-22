import { List, ListItem, Typography } from "@mui/material";
import React from "react"

export default function Blurb(props) {

    const section = props.section

    function Result() {
        if (section === "Acquisitions") {
            return (
                <>
                    This section shows the users acquired through traditional marketing channels such as advertisements, marketing events, and searches. Enter the assumptions regarding how many users will be acquired by the digital startup in each period and by how much that rate of user acquisitions will grow. You can also limit the starting period and ending period if the particular acquisition element will be limited for a particular time period.
                    <List>
                        <ListItem>Please note that:</ListItem>
                        <ListItem>- User acquisitions through referrals will be covered further down below and should not be entered in this section.</ListItem>
                        <ListItem>-	Numbers entered here should represent new users that will visit the particular website/ application but not necessarily all will actively use them.</ListItem>
                        <ListItem>- Increase in acquisitions per period should show the rate by which new acquisitions will grow. For example, if “Acquisitions per Period” is 100 and “Increase in Acquisitions” is 10, that represents 100 new users in period 0, 110 new users in period 1, 120 in period 3 and so on.</ListItem>
                        <ListItem>- Last two fields may not be visible for all users. They are “Starting Period” and “Ending Period”.</ListItem>
                    </List>
                </>
            )
        } else if (section === "Activation") {
            return (
                <>
                    In this section, enter the stages that users will have to go through during the digital startup’s customer journey. Typical stages can include registration, confirmation of e-mail, going through tutorials and starting to use the application.
                    <br /> <br />
                    Please note that percentage included in each section shows percentage of users that have gone through the preceding activation stages. For example, if 90% of users go through the first stage and 50% of users go through the second stage, overall activation would be 90%*50%=45% of users.
                </>
            )
        } else if (section === "Retention") {
            return (
                <>
                    After activation, the next step is to forecast how many users will stay active (be retained by the startup). Please enter what percentage of users will have decayed after the corresponding number of periods. Total number of periods that users can be retained can be increased by the + and - buttons below.
                </>
            )
        } else if (section === "Referrals") {
            return (
                <>
                    In this section, please enter how many new users are expected to be gained through referrals. More specifically, please enter the percentage of users that will refer new users and how many user acquisitions will each referring user bring.
                    <br /><br />
                    It has been assumed that each retained user will keep on referring new users even if they have referred users in the previous periods.
                </>
            )
        } else if (section === "Monetization") {
            return (
                <>
                    In this section, enter the assumptions regarding the percentage of users that will be paying users and how much revenue will be generated per user per period. Please note that customer acquisition costs are calculated based on costs per acquisition/ referral added in the “Acquisitions” and “Referrals” sections.
                </>
            )
        }

    }

    return (
        <Typography variant="body1" align="left" display="block" sx={{ mb: 5 }}>
            <Result />
        </Typography>
    )
}