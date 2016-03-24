import register from "js/stupidComponent.js";

register("s-skeleton", () => `
  <div class="g-container">
    <div class="row">
      <div class="col col-xs-6">
        <div class="weather widget"></div>
      </div>
      <div class="col col-xs-6">
        <div class="time widget"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="row">
        <div class="col col-xs-6">
          <div class="birthdays"></div>
        </div>
        <div class="col col-xs-6">
          <div class="notes widget"></div>
        </div>
      </div>
    </div>
  </div>
`);
