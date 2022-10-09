import { useRouter } from "next/router";
import React from "react";

import { EventDetails } from "@/components/pages/events/EventDetails";
import { Layout, RootStyle } from "@/layouts/Layout";
import { NextPageWithLayout } from "@/pages/_app";

/** Component for showing the detail page of an event. */
const EventInfo: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  return <>{id && typeof id === "string" ? <EventDetails eventId={id} /> : <></>}</>;
};

EventInfo.getLayout = (page: React.ReactElement) => (
  <Layout>
    <RootStyle>{page}</RootStyle>
  </Layout>
);

export default EventInfo;
