
import { StationList } from './StationList.jsx';

export function LibraryMobile() {

    return (
        <div className="mobile-library-container">
            <h2>Library</h2>
            <StationList width={100} isCompact={false} />
        </div>
    )
}