  let props=null;

  export const setProps=(propsp)=>{
      props=propsp;
  }
  
  export const fetchResource = (page) => {
    console.log(page);
    props.fetchResource(page);
  };
  export const firstClass = () => {
    return props.currentPage < props.pagerSize
      ? "page-item disabled"
      : "page-item";
  };
  export const previousClass = () => {
    return props.currentPage === 0 ? "page-item disabled" : "page-item";
  };
  export const nextClass = () => {
    return props.currentPage >= props.totalPages - 1
      ? "page-item disabled"
      : "page-item";
  };

  export const lastClass = () => {
    return props.currentPage >= props.totalPages - 1
      ? "page-item disabled"
      : "page-item";
  };

  export const getPagination = () => {
    const totalPages = props.totalPages;
    const currentPage = props.currentPage;
    const pagerSize = props.pagerSize;
    let end =
      totalPages - currentPage > Math.floor(pagerSize / 2)
        ? currentPage + Math.floor(pagerSize / 2)
        : totalPages;
    let ini =
      totalPages - currentPage > Math.floor(pagerSize / 2)
        ? currentPage - Math.floor(pagerSize / 2)
        : totalPages - pagerSize;
    if (currentPage < Math.floor(pagerSize / 2) + 1) {
      ini = 0;
      end = pagerSize - 1;
    }

    let range = new Array();
    for (let index = ini; index <= end; index++) {
      if (index < totalPages && index >= 0) range = [...range, [index]];
    }

    return range.map((value) => {
      return (
        <li
          key={Number.parseInt(value)}
          className={
            props.currentPage === Number.parseInt(value)
              ? "page-item active"
              : "page-item"
          }
        >
          <a
            className="page-link"
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              fetchResource(Number.parseInt(value));}}
          >
            {Number.parseInt(value) + 1}
          </a>
        </li>
      );
    });
  };

