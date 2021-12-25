import React, { FC } from 'react';
import { Button } from 'antd';

// FirstPost = () => ( にして'react'のimportしなくてもいけた
const FirstPost: FC = () => (
  <>
    <h1>First Post</h1>
    <Button type="primary">Button</Button>
    <div>
      <p>hgoe1</p>
      <p>hgoe2</p>
    </div>
    <div>
      <p>fuga1</p>
      <p>fuga2</p>
    </div>
  </>
)

export default FirstPost
