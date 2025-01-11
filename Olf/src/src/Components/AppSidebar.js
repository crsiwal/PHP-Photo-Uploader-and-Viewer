import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import access from "../config/access";

const AppSidebar = () => {
  const location = useLocation("/");
  const permissionList = useSelector(state => state.auth.permissions);
  const sidebarOpen = useSelector(state => state.layout.sidebarOpen);

  const [collapsed, setCollapsed] = useState("");
  const [permission, setPermission] = useState([]);

  useEffect(() => {
    const urlParts = location.pathname.split("/").filter(Boolean);
    const urlPart1 = typeof urlParts[0] == "undefined" ? "" : urlParts[0];
    setCollapsed(urlPart1);
  }, [location]);

  useEffect(() => {
    setPermission(permissionList);
  }, [permissionList]);

  const toggleCollapse = itemId => {
    setCollapsed(prevItemId => (prevItemId === itemId ? null : itemId));
  };

  function NavItem({ id, title, iconClass, path, children, access, collapsed, toggleCollapse }) {
    const isActive = collapsed === id;
    const childUndefined = typeof children == "undefined";
    let isPermitted = false;

    if (access && Object.keys(access).length > 0) {
      const askAccess = Object.values(access);
      if (askAccess.length > 0) {
        askAccess.map(accessKey => {
          if (permission.includes(accessKey)) {
            isPermitted = true;
          }
        });
      }
    }

    if (!isPermitted) {
      return <></>;
    }

    return (
      <li className={`nav-item ${isActive ? "active" : ""}`}>
        {childUndefined || !sidebarOpen ? (
          <NavLink onClick={() => toggleCollapse(id)} className="nav-link" to={path}>
            <i className={`${iconClass} menu-icon`}></i>
            <span className="menu-title">{title}</span>
          </NavLink>
        ) : (
          <>
            <div className="nav-link" onClick={() => toggleCollapse(id)} aria-expanded={isActive} aria-controls={`form-elements-${id}`}>
              <i className={`${iconClass} menu-icon`}></i>
              <span className="menu-title">{title}</span>
              {childUndefined ? "" : <i className="menu-arrow"></i>}
            </div>

            <div className={`collapse ${isActive ? "show" : ""}`} id={`form-elements-${id}`}>
              <ul className="nav flex-column sub-menu">{children}</ul>
            </div>
          </>
        )}
      </li>
    );
  }

  function NavItemLink({ to, title, access }) {
    const isPermitted = permission.includes(access);

    if (!isPermitted) {
      return <></>;
    }

    return (
      <li className="nav-item">
        <NavLink className="nav-link" to={to} end>
          {title}
        </NavLink>
      </li>
    );
  }

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <NavItem access={access.dashboard} collapsed={collapsed} toggleCollapse={toggleCollapse} id="" title="DASHBOARD" iconClass="icon-grid" path="/"></NavItem>

        {/* IMEI */}
        <NavItem access={access.imei} collapsed={collapsed} toggleCollapse={toggleCollapse} id="imei" title="IMEI" iconClass="icon-layout" path="/imei">
          <NavItemLink access={access.imei.view} to="/imei" title="View IMEI" />
          <NavItemLink access={access.imei.update} to="/imei/update" title="Update IMEI" />
          <NavItemLink access={access.imei.upload} to="/imei/upload" title="Register IMEI" />
        </NavItem>

        {/* Users */}
        <NavItem access={access.user} collapsed={collapsed} toggleCollapse={toggleCollapse} id="users" title="USERS" iconClass="icon-head" path="/users">
          <NavItemLink access={access.user.add} to="/users/add" title="Add User" />
          <NavItemLink access={access.user.view} to="/users" title="View Users" />
          <NavItemLink access={access.role.add} to="/users/role/add" title="Add Role" />
          <NavItemLink access={access.role.view} to="/users/role" title="View Roles" />
        </NavItem>

        {/* Company */}
        <NavItem access={access.company} collapsed={collapsed} toggleCollapse={toggleCollapse} id="company" title="COMPANY" iconClass="icon-tag" path="/company">
          <NavItemLink access={access.company.add} to="/company/add" title="Add Company" />
          <NavItemLink access={access.company.view} to="/company" title="View Company" />
        </NavItem>

        {/* Projects */}
        <NavItem access={access.project} collapsed={collapsed} toggleCollapse={toggleCollapse} id="projects" title="PROJECTS" iconClass="icon-archive" path="/projects">
          <NavItemLink access={access.project.add} to="/projects/add" title="Add Project" />
          <NavItemLink access={access.project.view} to="/projects" title="View Projects" />
        </NavItem>

        {/* IMEI Status */}
        <NavItem access={access.status} collapsed={collapsed} toggleCollapse={toggleCollapse} id="status" title="Status" iconClass="icon-anchor" path="/status">
          <NavItemLink access={access.status.view} to="/status" title="View IMEI Status" />
          <NavItemLink access={access.status.add} to="/status/add" title="Add IMEI Status" />
          <NavItemLink access={access.status.order} to="/status/order" title="Change Order" />
        </NavItem>

        {/* Permissions */}
        <NavItem access={access.permission} collapsed={collapsed} toggleCollapse={toggleCollapse} id="permission" title="PERMISSIONS" iconClass="icon-layers" path="/permission">
          <NavItemLink access={access.permission.add} to="/permission/add" title="Add Permission" />
          <NavItemLink access={access.permission.view} to="/permission" title="View Permission" />
        </NavItem>
      </ul>
    </nav>
  );
};

export default AppSidebar;
