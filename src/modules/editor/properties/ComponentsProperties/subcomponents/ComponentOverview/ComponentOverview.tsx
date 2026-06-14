import { PropertyComponentHeader } from '../'
import { Puck } from '@measured/puck'

export function ComponentOverview() {
    return (
        <div className="flex flex-col">
            <PropertyComponentHeader />
            <div className="scrollable-wrapper">
                <Puck.Fields />
            </div>
        </div>
    )
}
