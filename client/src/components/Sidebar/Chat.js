import React, { Component } from "react";
import { Box, Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { clearUnreadCount } from '../../store/utils/thunkCreators';
import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

class Chat extends Component {
  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation.otherUser.username);
    await this.props.clearUnreadCount(conversation.id);
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    const { unreadCount = 0 } = this.props.conversation;
    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
        {unreadCount > 0 &&
          <>
            <Badge badgeContent={unreadCount} color="primary">
            </Badge>
          </>
        }
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    clearUnreadCount: (conversationId) => {
      dispatch(clearUnreadCount(conversationId));
    }
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
