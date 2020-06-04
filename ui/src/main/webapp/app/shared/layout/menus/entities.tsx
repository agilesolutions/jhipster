import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/employee">
      <Translate contentKey="global.menu.entities.organizationEmployee" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/department">
      <Translate contentKey="global.menu.entities.organizationDepartment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/employee-leave">
      <Translate contentKey="global.menu.entities.leaveEmployeeLeave" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/leave-request">
      <Translate contentKey="global.menu.entities.leaveLeaveRequest" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/notification">
      <Translate contentKey="global.menu.entities.notificationNotification" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/meeting-room">
      <Translate contentKey="global.menu.entities.meetingMeetingRoom" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/participant">
      <Translate contentKey="global.menu.entities.meetingParticipant" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/meeting">
      <Translate contentKey="global.menu.entities.meetingMeeting" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
