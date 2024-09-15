import { React } from 'react';
import PropTypes from "prop-types";
import Panel from "./../Common/Panel";
import RequestList from './RequestList';
import useHeader from "./../../hooks/useHeader";
import PageHeader from '../Common/PageHeader';

export default function RequestPageView({userGroup}) {
    const { setHeader } = useHeader();
    setHeader("Bokningar");

    RequestPageView.propTypes = {
        userGroup: PropTypes.string.isRequired
    };

    let bookingConfig = null

    if (userGroup == "host") {
        bookingConfig = {
            fetchUrl: "/api/host/pending",
            assignUrl: (bookingId) => `/api/host/pending/${bookingId}/appoint`,
            batchAssignUrl:"/api/host/pending/batch/accept",
            rejectUrl: (bookingId) => `/api/host/pending/${bookingId}/decline`,
            undoUrl: (bookingId) => `/api/host/bookings/${bookingId}/setpending`
        };    
    } else if (userGroup == "caseworker") {
        bookingConfig = {
            fetchUrl: "/api/caseworker/bookings/pending",
            assignUrl: (bookingId) => `/api/caseworker/bookings/${bookingId}/accept`,
            batchAssignUrl:"/api/caseworker/bookings/batch/accept",
            rejectUrl: (bookingId) => `/api/caseworker/bookings/${bookingId}/decline`,
            undoUrl: (bookingId) => `/api/caseworker/bookings/${bookingId}/setpending`
        };
    } else {
        console.log("Invalid userGroup for RequestPageView.");
    }

    return (
        <div className='p-4'>
            <div>
                <RequestList config={bookingConfig}/>
            </div>
        </div>
    );
}
