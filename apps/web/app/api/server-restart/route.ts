import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET(req: NextRequest) {
  try {
    // Run the PM2 restart command
    const { stdout, stderr } = await execAsync('pm2 reload all');
    
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return NextResponse.json(
        { error: stderr },
        { status: 500 }
      );
    }

    console.log(`stdout: ${stdout}`);
    return NextResponse.json(
      { message: 'PM2 restarted successfully' },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error(`Unexpected error: ${error.message}`);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

