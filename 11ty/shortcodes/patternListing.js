module.exports = (collection, sort) => {
  const hasSorting = sort != null;
  const isAlphabetical = sort === "alphabetical";
  const linkAlphabetical = isAlphabetical ? "./" : "../";
  const linkLastUpdated = !isAlphabetical ? "./" : "./last-updated";

  const sortButtons = hasSorting
    ? `<div class="button-group">
        <a class="btn btn-sm${
          isAlphabetical ? " btn-active" : ""
        }" href="${linkAlphabetical}">Alphabetical</a>
        <a class="btn btn-sm${
          !isAlphabetical ? " btn-active" : ""
        }" href="${linkLastUpdated}">Last Updated</a>
      </div>`
    : "";

  return `<section id="pattern-listing">
    <div class="filterbar">
      <input type="text" id="filterbar-input" placeholder="Filter patterns..." />
      ${sortButtons}
    </div>
  </section>`;
};
