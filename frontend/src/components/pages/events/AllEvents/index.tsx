import { useQuery } from "@apollo/client";
import { GET_USER } from "@graphql/auth/queries";
import { GET_EVENTS } from "@graphql/events/queries";
import { Event } from "@interfaces/events";
import { User } from "@interfaces/users";
import Link from "next/link";
import React, { useState } from "react";
import { Filter, PlusSquare } from "react-feather";
import styled from "styled-components";
import { NavItem } from "../../../navbar/NavbarLinks";
import { DATAPORTEN_SCOPES, generateAuthURL } from "../../../navbar/utils";
import FilterMenu from "./filterMenu";

export interface FilterQuery {
  organization?: string;
  category?: string;
  startTime?: string;
  endTime?: string;
}

const signInURL = generateAuthURL(
  process.env.NEXT_PUBLIC_DATAPORTEN_ID,
  process.env.NEXT_PUBLIC_DATAPORTEN_STATE,
  process.env.NEXT_PUBLIC_DATAPORTEN_REDIRECT_URI,
  DATAPORTEN_SCOPES
);

const AllEvents: React.FC = () => {
  const [filters, setFilters] = useState({});
  const [showTableView, setShowTableView] = useState(false);
  const { loading: userLoading, error: userError, data: userData } = useQuery<{ user: User }>(GET_USER);
  const { loading, error, data, refetch } = useQuery(GET_EVENTS, {
    variables: filters,
  });
  // should handle loading status
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  const onChange = (newFilters: FilterQuery) => {
    setFilters(newFilters);
    refetch(newFilters);
  };

  return (
    <div>
      <NavItem
        style={{ paddingBottom: "0px", paddingTop: "0px", margin: "0px", fontSize: "1.1em" }}
        className={!showTableView ? "active" : ""}
        primary
        onClick={() => setShowTableView(!showTableView)}
      >
        Liste
      </NavItem>
      <NavItem
        style={{ paddingBottom: "0px", paddingTop: "0px", fontSize: "1.1em" }}
        className={showTableView ? "active" : ""}
        primary
        onClick={() => setShowTableView(!showTableView)}
      >
        Kalender
      </NavItem>

      <div style={{ float: "right" }}>
        {!userData || userLoading || !userData.user || userError ? (
          // TODO: Redirect til `/events/create-event` når vi har funksjonalitet for dette.
          <Link href={signInURL}>
            <StyledIconButton>
              <PlusSquare />
              <p style={{ margin: 0 }}>Opprett (Krever innlogging)</p>
            </StyledIconButton>
          </Link>
        ) : (
          <Link href={`/events/create-event`}>
            <StyledIconButton>
              <PlusSquare />
              <p style={{ margin: 0 }}>Opprett</p>
            </StyledIconButton>
          </Link>
        )}
      </div>

      <div style={{ float: "right", marginRight: "15px" }}>
        <StyledIconButton>
          <Filter />
          <p style={{ margin: 0 }}>Filter</p>
        </StyledIconButton>
      </div>

      <div style={{ width: "100%", paddingTop: "1em" }}>
        {showTableView ? (
          <p>{"Kommer snart! :)"}</p>
        ) : (
          <>
            {data.allEvents.length === 0 ? (
              <h4>{"Ingen arrangementer passer til valgte filtere"}</h4>
            ) : (
              data.allEvents.map((event: Event) => (
                <Link href={`/events/${event.id}`} key={event.id}>
                  <a href={`/events/${event.id}`} style={{ color: "#000" }}>
                    <div
                      style={{
                        border: "solid",
                        borderWidth: "0.05em 0.05em 0.05em 1.2em",
                        borderColor: (event.organization && event.organization.color) ?? "#6A9997",
                        borderRadius: "0.2em",
                        padding: "0.5em",
                        marginBottom: "0.5em",
                        backgroundColor: "#FFF",
                      }}
                    >
                      <p style={{ marginBottom: "0.2em" }}>{event.title}</p>
                      <p style={{ marginTop: 0 }}>Starttid: {event.startTime.slice(0, 19).replace("T", " ")}</p>
                    </div>
                  </a>
                </Link>
              ))
            )}
          </>
        )}
      </div>
      <FilterMenu filters={filters} onChange={onChange} />
    </div>
  );
};

export default AllEvents;

const StyledIconButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-family: "Montserrat";
  font-size: 18px;
  border: none;
  display: flex;
  align-items: stretch;
  text-decoration: none !important;
  transition: 0.3s all ease;
  padding: 0;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    border: none;
    outline: none;
  }
`;
