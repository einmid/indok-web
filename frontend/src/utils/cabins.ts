import { Cabin, ContactInfo, InputValueTypes } from "@interfaces/cabins";
import dayjs from "dayjs";
import { DatePick } from "src/pages/cabins/book";
import validator from "validator";

export const validateName = (name: string) => name.length > 0;

export const validateEmail = (email: string): boolean => validator.isEmail(email);

export const validateSelect = (numberIndok: number, numberExternal: number): boolean =>
  numberIndok > 0 || numberExternal > 0;

export const validatePhone = (phone: string): boolean => (phone ? validator.isMobilePhone(phone) : false);

export const validateInputForm = (inputValues: InputValueTypes) => {
  const selectValidity = validateSelect(inputValues.numberIndok, inputValues.numberExternal);

  const updatedValidations = {
    firstname: validateName(inputValues.firstname),
    lastname: validateName(inputValues.surname),
    email: validateEmail(inputValues.receiverEmail),
    phone: validatePhone(inputValues.phone),
    numberIndok: selectValidity,
    numberExternal: selectValidity,
    triggerError: false,
  };

  return updatedValidations;
};

export const cabinOrderStepReady = (
  chosenCabins: Cabin[],
  datePick: DatePick
): { ready: boolean; errortext: string } => {
  // At least one cabin has to be selected
  if (chosenCabins.length == 0) {
    return { ready: false, errortext: "Du må velge minst en hytte å booke" };
  }
  // The user needs to enter a check-in date
  if (!datePick.checkInDate) {
    return { ready: false, errortext: "Du må velge en dato for innsjekk" };
  }
  // The user needs to enter a check-out date
  if (!datePick.checkOutDate) {
    return { ready: false, errortext: "Du må velge en dato for utsjekk" };
  }
  // The chosen range must be vaild
  if (!datePick?.isValid) {
    return { ready: false, errortext: "Den valgte perioden er ikke tilgjengelig" };
  }
  return { ready: true, errortext: "" };
};

export const toStringChosenCabins = (chosenCabins: Cabin[]) =>
  chosenCabins.map((cabin, i) => (i > 0 ? " og " + cabin.name : cabin.name));

export const calculatePrice = (chosenCabins: Cabin[], contactInfo: ContactInfo, datePick: DatePick) => {
  const internalPrice = contactInfo.numberIndok >= contactInfo.numberExternal;
  const pricePerNight = chosenCabins
    .map((cabin) => (internalPrice ? cabin.internalPrice : cabin.externalPrice))
    .reduce((sum, currentPrice) => sum + currentPrice);

  if (datePick.checkInDate && datePick.checkOutDate) {
    const checkOutDate = dayjs(datePick.checkOutDate);
    const rangeLength = checkOutDate.diff(datePick.checkInDate, "day");
    return pricePerNight * rangeLength;
  }
};
