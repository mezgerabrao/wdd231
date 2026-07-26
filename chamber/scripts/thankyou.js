const submissionDetails = document.querySelector("#submission-details");
const formData = new URLSearchParams(window.location.search);

const firstName = formData.get("firstName");
const lastName = formData.get("lastName");
const email = formData.get("email");
const phone = formData.get("phone");
const organization = formData.get("organization");
const timestamp = formData.get("timestamp");

function formatTimestamp(timestampValue) {
  if (!timestampValue) {
    return "Not provided";
  }

  const date = new Date(timestampValue);

  if (Number.isNaN(date.getTime())) {
    return timestampValue;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(date);
}

function createSubmissionRow(labelText, valueText) {
  const row = document.createElement("div");
  const label = document.createElement("span");
  const value = document.createElement("span");

  row.classList.add("submission-row");
  label.classList.add("submission-label");
  value.classList.add("submission-value");

  label.textContent = labelText;
  value.textContent = valueText || "Not provided";

  row.append(label, value);

  return row;
}

if (submissionDetails) {
  submissionDetails.innerHTML = "";

  submissionDetails.append(
    createSubmissionRow("First Name", firstName),
    createSubmissionRow("Last Name", lastName),
    createSubmissionRow("Email Address", email),
    createSubmissionRow("Mobile Number", phone),
    createSubmissionRow("Business Name", organization),
    createSubmissionRow("Submission Date", formatTimestamp(timestamp))
  );
}