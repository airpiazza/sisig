export const Add = () => {
  return <><div>
  <label  htmlFor="item-name">
    What ingredient would you like to add?
  </label>
  <input  id="item-name" name="itemName" type="text" />
</div>
<button type="submit" data-module="govuk-button">
  Save and continue
</button>
</>
};
