const TransactionTableFooter = ({ data }) => (
  <div class="card-footer d-flex align-items-center">
    <p class="m-0 text-muted">
      Showing <span>1</span> to <span>8</span> of <span>16</span> entries
    </p>
    <ul class="pagination m-0 ms-auto">
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="15 6 9 12 15 18" />
          </svg>
          prev
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">
          1
        </a>
      </li>
      <li class="page-item active">
        <a class="page-link" href="#">
          2
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">
          3
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">
          4
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">
          5
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">
          next{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
);

export default TransactionTableFooter;
